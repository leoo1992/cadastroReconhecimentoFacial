import test from 'node:test';import assert from 'node:assert/strict';import{isSensitivePath,qualityPercent}from'../quality/core.mjs';
test('quality score',()=>{assert.equal(qualityPercent(20,20),100);assert.equal(qualityPercent(16,20),80);assert.equal(qualityPercent(0,0),0)});
test('sensitive files',()=>{assert.equal(isSensitivePath('.env'),true);assert.equal(isSensitivePath('private.key'),true);assert.equal(isSensitivePath('.env.example'),false);assert.equal(isSensitivePath('src/index.js'),false)});
