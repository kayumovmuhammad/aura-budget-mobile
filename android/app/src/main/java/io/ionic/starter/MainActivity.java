package io.ionic.starter;

import android.os.Bundle;
import android.webkit.WebView;
import android.view.View;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onStart() {
        super.onStart();
        WebView webview = this.bridge.getWebView();
        if (webview != null) {
            webview.setOverScrollMode(View.OVER_SCROLL_NEVER);
        }
    }
}
