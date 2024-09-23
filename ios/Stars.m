//
//  Stars.m
//  Dots
//
//  Created by riswan ardiansah on 15/09/24.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Stars, NSObject)

// Correctly declare a synchronous method
RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(generateRandomArraySync)

@end
