package expo.modules.dji

import android.content.pm.PackageManager
import dji.v5.common.error.IDJIError
import dji.v5.common.register.DJISDKInitEvent
import dji.v5.manager.SDKManager
import dji.v5.manager.interfaces.SDKManagerCallback
import expo.modules.kotlin.Promise
import expo.modules.kotlin.exception.CodedException
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URL

class ExpoDjiModule : Module() {
    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    override fun definition() = ModuleDefinition {
        // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
        // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
        // The module will be accessible from `requireNativeModule('ExpoDji')` in JavaScript.
        Name("ExpoDji")

        OnCreate {
            val activity = appContext.activityProvider?.currentActivity

            println("[DJI] com.cySdkyc.clx.Helper.install")
            com.cySdkyc.clx.Helper.install(activity?.application)
        }

        // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
        Constants(
            "PI" to Math.PI
        )

        // Defines event names that the module can send to JavaScript.
        Events("onChange")

        Function("getApiKey") {
            val packageName = appContext.reactContext?.packageName.toString()
            val packageManager = appContext.reactContext?.packageManager
            val applicationInfo =
                packageManager?.getApplicationInfo(packageName, PackageManager.GET_META_DATA)
            val apiKey = applicationInfo?.metaData?.getString("com.dji.sdk.API_KEY")
            apiKey
        }

        AsyncFunction("registerApp") { promise: Promise ->
            val activity = appContext.activityProvider?.currentActivity
            activity?.runOnUiThread(Runnable {
                println("[DJI] init sdk")
                SDKManager.getInstance().init(activity, object : SDKManagerCallback {
                    override fun onInitProcess(event: DJISDKInitEvent?, totalProcess: Int) {
                        println("[DJI] onInitProcess $event")
                        if (event == DJISDKInitEvent.INITIALIZE_COMPLETE) {
                            println("[DJI] register app")
                            SDKManager.getInstance().registerApp()
                        }
                    }

                    override fun onRegisterSuccess() {
                        println("[DJI] register app success")
                        promise.resolve()
                    }

                    override fun onRegisterFailure(error: IDJIError?) {
                        println("[DJI] register app failure $error")
                        promise.reject(CodedException(error?.toString()))
                    }

                    override fun onProductDisconnect(productId: Int) {
                    }

                    override fun onProductConnect(productId: Int) {
                    }

                    override fun onProductChanged(productId: Int) {
                    }

                    override fun onDatabaseDownloadProgress(current: Long, total: Long) {
                    }
                })
            })
        }

        // Enables the module to be used as a native view. Definition components that are accepted as part of
        // the view definition: Prop, Events.
        View(ExpoDjiView::class) {
            // Defines a setter for the `url` prop.
            Prop("url") { view: ExpoDjiView, url: URL ->
                view.webView.loadUrl(url.toString())
            }
            // Defines an event that the view can send to JavaScript.
            Events("onLoad")
        }
    }
}
