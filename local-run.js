// Local test runner that exercises the text-processing logic without starting the HTTP server
// This avoids network/listener issues and does not require OPENAI_API_KEY.

function mockProcessTextRequest(text, action) {
  const summaries = {
    summarize: `Summary: ${text.slice(0, 80)}${text.length > 80 ? '...' : ''}`,
    improve: `Improved: ${text} (improved clarity and tone)` ,
    explain: `Explanation: This explains the text in simple terms: ${text}`
  };

  if (!['summarize','improve','explain'].includes(action)) {
    throw new Error('Invalid action: ' + action);
  }

  return Promise.resolve(summaries[action]);
}

(async () => {
  try {
    console.log('Local test runner (mocked AI)');

    const health = { status: 'ok', message: 'AI Text Assistant API (mock) is running' };
    console.log('--- /health ---');
    console.log('Status: 200');
    console.log(JSON.stringify(health, null, 2));

    const sample = { text: 'This is a short sample text to summarize.', action: 'summarize' };
    const result = await mockProcessTextRequest(sample.text, sample.action);

    console.log('--- /api/process-text (sample) ---');
    console.log('Status: 200');
    console.log(JSON.stringify({ success: true, result, action: sample.action }, null, 2));
  } catch (err) {
    console.error('Local test error:', err);
    process.exitCode = 1;
  }
})();
