//
//  ExitApp.m
//  Dots
//
//  Created by riswan ardiansah on 25/04/24.
//

#import "ExitApp.h"

@implementation ExitApp

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(exit) {
    dispatch_async(dispatch_get_main_queue(), ^{
        UIApplication* app = [UIApplication sharedApplication];
        if ([app respondsToSelector:@selector(suspend)]) {
            [app performSelector:@selector(suspend)];
        }
    });
}

@end
