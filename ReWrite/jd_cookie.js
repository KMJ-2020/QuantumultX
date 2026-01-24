/**
 * 专门获取京东 pt_key 和 pt_pin 的 QX 脚本
 * 触发路径：京东 App -> 我的
 */

const cookie = $request.headers['Cookie'] || $request.headers['cookie'];

if (cookie && cookie.indexOf('pt_key=') > -1) {
  const pt_key = /pt_key=([^;]+)/.exec(cookie)[1];
  const pt_pin = /pt_pin=([^;]+)/.exec(cookie)[1];
  const ck = `pt_key=${pt_key};pt_pin=${pt_pin};`;

  // 1. 存储到 QX 内部，防止通知消失后找不着
  $prefs.setValueForKey(ck, 'CookiesJD');
  
  // 2. 发送系统通知
  $notify("京东 Cookie 获取成功 ✅", "", ck);
  
  // 3. 自动复制到剪贴板
  if ($copy(ck)) {
      console.log("Cookie 已自动复制到剪贴板");
  }
}

$done({});
