/**
 * 浏览器插件认证示例代码
 *
 * 这个文件展示了如何在Chrome扩展中使用Chinawords的认证API
 */

// 登录并获取token
async function loginAndGetToken(username, password) {
  try {
    // 1. 使用credentials登录
    const loginResponse = await fetch('https://chinawords.com/api/auth/callback/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        redirect: false,
      }),
      credentials: 'include', // 重要：包含cookies
    });

    if (!loginResponse.ok) {
      throw new Error('登录失败');
    }

    // 2. 获取token
    const tokenResponse = await fetch('https://chinawords.com/api/auth/token', {
      method: 'GET',
      credentials: 'include', // 重要：包含cookies
    });

    if (!tokenResponse.ok) {
      throw new Error('获取token失败');
    }

    const { accessToken, expiresAt } = await tokenResponse.json();

    // 3. 存储token到插件的存储中
    chrome.storage.local.set({
      chinawordsToken: accessToken,
      chinawordsTokenExpiry: expiresAt,
    }, () => {
      console.log('Token已保存');
    });

    return accessToken;
  } catch (error) {
    console.error('认证错误:', error);
    throw error;
  }
}

// 使用token访问API
async function fetchWithToken(url, options = {}) {
  // 从存储中获取token
  const { chinawordsToken, chinawordsTokenExpiry } = await chrome.storage.local.get([
    'chinawordsToken',
    'chinawordsTokenExpiry',
  ]);

  // 检查token是否存在且未过期
  if (!chinawordsToken || new Date(chinawordsTokenExpiry) <= new Date()) {
    throw new Error('Token不存在或已过期，请重新登录');
  }

  // 添加Authorization header
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${chinawordsToken}`,
  };

  // 发送请求
  return fetch(url, {
    ...options,
    headers,
  });
}

// 使用示例 - 仅供参考，不会被实际调用
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function exampleUsage() {
  try {
    // 登录并获取token
    await loginAndGetToken('username', 'password');

    // 使用token获取用户资产
    const assetsResponse = await fetchWithToken('https://chinawords.com/api/assets');
    const assets = await assetsResponse.json();
    console.log('用户资产:', assets);

    // 使用token上传资产
    const uploadResponse = await fetchWithToken('https://chinawords.com/api/assets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: '新资产',
        prompt: '生成提示',
        mediaType: 0, // 图片
        fileUri: 'https://example.com/image.jpg',
      }),
    });
    const newAsset = await uploadResponse.json();
    console.log('上传的资产:', newAsset);
  } catch (error) {
    console.error('示例错误:', error);
  }
}
