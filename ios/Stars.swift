//
//  Stars.swift
//  Dots
//
//  Created by riswan ardiansah on 15/09/24.
//

import Foundation
import React

@objc(Stars)
class Stars: NSObject {

  // Synchronous method
  @objc
  func generateRandomArraySync() -> NSArray {
    var array = [NSDictionary]()

    for i in 1...200 {
      let x = Float.random(in: 0...1) - 0.5
      let y = Float.random(in: 0...1) - 0.5
      
      let star: NSDictionary = [
        "id": i,
        "x": x,
        "y": y
      ]
      
      array.append(star)
    }

    return array as NSArray
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
