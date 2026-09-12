#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
if (!process.argv[2]) {
  throw new Error("Usage: node scripts/build-public-data.mjs /absolute/path/to/approved/public-content");
}

const approvedDir = resolve(process.argv[2]);
const outputDir = resolve(projectRoot, "data");

const forbiddenKeys = new Set([
  "email",
  "password",
  "passwordHash",
  "ipAddress",
  "userAgent",
  "childName",
  "children",
  "specialNeeds",
  "accessToken",
  "refreshToken",
]);

async function loadArray(name) {
  const path = resolve(approvedDir, `${name}.json`);
  const value = JSON.parse(await readFile(path, "utf8"));
  if (!Array.isArray(value)) throw new Error(`${path} must contain a JSON array`);
  return value;
}

function findForbiddenKeys(value, location = "$") {
  const findings = [];
  if (Array.isArray(value)) {
    value.forEach((item, index) => findings.push(...findForbiddenKeys(item, `${location}[${index}]`)));
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (forbiddenKeys.has(key)) findings.push(`${location}.${key}`);
      findings.push(...findForbiddenKeys(item, `${location}.${key}`));
    }
  }
  return findings;
}

function validateResources(resources) {
  const ids = new Set();
  for (const [index, resource] of resources.entries()) {
    if (!resource || typeof resource !== "object") throw new Error(`resources[${index}] must be an object`);
    if (typeof resource.sourceId !== "string" || !resource.sourceId.trim()) throw new Error(`resources[${index}].sourceId is required`);
    if (ids.has(resource.sourceId)) throw new Error(`Duplicate sourceId: ${resource.sourceId}`);
    ids.add(resource.sourceId);
    if (typeof resource.resourceName !== "string" || !resource.resourceName.trim()) throw new Error(`resources[${index}].resourceName is required`);
  }
  return ids;
}

function validateReviews(reviews, resourceIds) {
  for (const [index, review] of reviews.entries()) {
    if (!review || typeof review !== "object") throw new Error(`reviews[${index}] must be an object`);
    if (!resourceIds.has(review.sourceId)) throw new Error(`reviews[${index}] references unknown sourceId: ${review.sourceId}`);
    if (typeof review.rating !== "number" || review.rating < 1 || review.rating > 5) throw new Error(`reviews[${index}].rating must be from 1 to 5`);
  }
}

const resources = await loadArray("resources");
const reviews = await loadArray("reviews");
const forbidden = findForbiddenKeys({ resources, reviews });
if (forbidden.length) throw new Error(`Private fields detected:\n${forbidden.join("\n")}`);

const resourceIds = validateResources(resources);
validateReviews(reviews, resourceIds);

await Promise.all([
  writeFile(resolve(outputDir, "resources.js"), `window.SEE_RESOURCES = ${JSON.stringify(resources, null, 2)};\n`, "utf8"),
  writeFile(resolve(outputDir, "reviews.js"), `window.SEE_REVIEWS = ${JSON.stringify(reviews, null, 2)};\n`, "utf8"),
]);

console.log(JSON.stringify({ resourceCount: resources.length, reviewCount: reviews.length, source: approvedDir, output: outputDir }, null, 2));
