import test from 'node:test';
import assert from 'node:assert/strict';
import {isRepositoryReady,repositoryQualityScore} from '../quality/repository-quality.mjs';
test('quality score',()=>{assert.equal(repositoryQualityScore(20,20),100);assert.equal(repositoryQualityScore(16,20),80);assert.equal(repositoryQualityScore(0,0),0)});
test('threshold',()=>{assert.equal(isRepositoryReady(80),true);assert.equal(isRepositoryReady(79),false)});
