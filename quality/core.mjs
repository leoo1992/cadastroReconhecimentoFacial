/** @param {number} p @param {number} t */
export function qualityPercent(p,t){if(!Number.isFinite(p)||!Number.isFinite(t)||t<=0)return 0;return Math.round(p/t*100)}
/** @param {string} p */
export function isSensitivePath(p){const n=p.toLowerCase();if(/(^|\/)\.env(?:\.|$)/.test(n)&&!(/\.(example|sample|template)$/.test(n)))return true;return /\.(pem|key|p12|pfx|jks|keystore)$/.test(n)}
