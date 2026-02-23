// Simple test client to call local backend endpoints and print responses
(async () => {
  try {
    const health = await fetch('http://localhost:3001/health');
    const healthText = await health.text();
    console.log('--- /health ---');
    console.log('Status:', health.status);
    console.log(healthText);

    const payload = { text: 'This is a short sample text to summarize.', action: 'summarize' };
    const post = await fetch('http://localhost:3001/api/process-text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const postText = await post.text();
    console.log('--- /api/process-text (sample) ---');
    console.log('Status:', post.status);
    console.log(postText);
  } catch (err) {
    console.error('Test client error:', err);
    process.exitCode = 1;
  }
})();
