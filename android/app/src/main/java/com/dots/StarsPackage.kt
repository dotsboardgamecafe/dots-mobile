package com.dots

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager
import java.util.Collections

class StarsPackage(): ReactPackage {
	override fun createNativeModules(p0: ReactApplicationContext): MutableList<NativeModule> {
		val modules = ArrayList<NativeModule>()
		modules.add(Stars(p0))
		
		return modules
	}
	
	override fun createViewManagers(p0: ReactApplicationContext): MutableList<ViewManager<View, ReactShadowNode<*>>> {
		return Collections.emptyList()
	}
}