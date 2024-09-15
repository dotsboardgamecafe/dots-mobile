package com.dots

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableArray
import kotlin.random.Random

class Stars(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
	override fun getName(): String {
		return "Stars"
	}
	
	@ReactMethod(isBlockingSynchronousMethod = true)
	fun generateRandomArraySync(): WritableArray {
		val array = Arguments.createArray()
		
		for (i in 0..100) {
			val dict = Arguments.createMap()
			val x = Random.nextDouble(0.0, 1.0) - 0.5
			val y = Random.nextDouble(0.0, 1.0) - 0.5
			
			dict.putInt("id", i)
			dict.putDouble("x", x)
			dict.putDouble("y", y)
			
			array.pushMap(dict)
		}
		
		return array
	}
}