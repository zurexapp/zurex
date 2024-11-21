package com.aczurex.app

import android.app.Application
import com.facebook.drawee.backends.pipeline.Fresco
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.henninghall.date_picker.DatePickerPackage
import com.brentvatne.react.ReactVideoPackage
import com.webengage.WebengageBridge // Import WebengageBridge
import com.webengage.sdk.android.User
import com.webengage.sdk.android.WebEngage
import com.webengage.sdk.android.WebEngageConfig
import com.webengage.sdk.android.WebEngageActivityLifeCycleCallbacks

class MainApplication : Application(), ReactApplication {

    override val reactNativeHost: ReactNativeHost =
        object : DefaultReactNativeHost(this) {
            override fun getPackages(): List<ReactPackage> =
                PackageList(this).packages.apply {
                    // Packages that cannot be autolinked yet can be added manually here, for example:
                    // add(MyReactNativePackage())
                }

            override fun getJSMainModuleName(): String = "index"

            override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

            override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
        }

    override val reactHost: ReactHost
        get() = getDefaultReactHost(applicationContext, reactNativeHost)

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)

        // Initialize WebengageBridge
        WebengageBridge.getInstance()  // Add this

        // WebEngage configuration setup
        val webEngageConfig = WebEngageConfig.Builder()
            .setWebEngageKey("in~~10a5cbb59") // Replace with your WebEngage key
            .setDebugMode(true) // Enable debug mode in development
            .build()

        // Registering the activity lifecycle callbacks
        registerActivityLifecycleCallbacks(WebEngageActivityLifeCycleCallbacks(this, webEngageConfig))

        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            // Load native entry point for the new architecture
            load()
        }
    }
}
