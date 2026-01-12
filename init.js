chrome.runtime.onInstalled.addListener(() => {
    console.log("[KRS-logger] KrunkerResourceSwapper activated")
});

let ruleMapPromise;

function getRuleMap() {
    if (ruleMapPromise) return ruleMapPromise;

    ruleMapPromise = fetch(chrome.runtime.getURL('rules.json'))
    .then(r => r.json())
    .then(rules => {
        const map = {};
        for (const r of rules) {
            const p = r?.action?.redirect?.extensionPath;
            if (p) map[r.id] = p.replace(/^\/+/, '');
        }
        return map;
    })
    .catch(err => {
        console.error('[KRS-logger] Failed to load rules.json', err);
        return {};
    });

    return ruleMapPromise;
}

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(async info => {
    const url = info.request?.url || info.url || '(unknown)';
  
    const ruleId  = info.rule?.ruleId ?? info.ruleId;
    const map     = await getRuleMap();
    const relPath = map[ruleId];
    const extURL  = relPath ? chrome.runtime.getURL(relPath) : '(unknown)';
  
    console.log(`[KRS-logger] [Redirect] ${url} → ${extURL}`);
  });  
  
chrome.webRequest.onErrorOccurred.addListener(details => {
    console.error('[KRS-logger] [ERROR]', details.error, '→', details.url, '\nThere is a possibility that the file is missing, add the missing file or recreate rules.json');
}, { urls: ["<all_urls>"] });