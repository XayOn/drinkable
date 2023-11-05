package com.xayon.drinkable;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
  }

  @Override
  protected void onNewIntent(Intent intent) {
    super.onNewIntent(intent);

    WebView webview = getBridge().getWebView();

    WebSettings webSettings = webview.getSettings();
    webSettings.setJavaScriptEnabled(true);
    String currAction = intent.getAction();
    if (Intent.ACTION_VIEW.equals(currAction)) {
      Uri uri = intent.getData();
      if (uri != null) {
        String qrCode = uri.getQueryParameter("custom_qr");
        if (qrCode != null && !qrCode.isEmpty()) {
          webview.evaluateJavascript(
              "javascript:setupMixologyDevice('" + qrCode + "');", null);
        }
      }
    }
  }

  @Override
  public void onStart() {
    super.onStart();

    WebView webview = getBridge().getWebView();
    webview.setOverScrollMode(WebView.OVER_SCROLL_NEVER);
  }
}
