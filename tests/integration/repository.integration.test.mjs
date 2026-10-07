import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';

const projectMarkers = ['package.json','pom.xml','build.gradle','build.gradle.kts','composer.json','manage.py','pyproject.toml','requirements.txt','src','app'];

test('repository exposes an application manifest or source boundary', () => {
  assert.ok(projectMarkers.some((path) => existsSync(path)), 'expected at least one recognized application manifest or source directory');
});
