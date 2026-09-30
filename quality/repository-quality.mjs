export function repositoryQualityScore(passed,total){if(!Number.isFinite(passed)||!Number.isFinite(total)||total<=0)return 0;return Math.round((passed/total)*100)}
export function isRepositoryReady(score){return score>=80}
