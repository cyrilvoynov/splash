#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(DynamicIslandModule, NSObject)

RCT_EXTERN_METHOD(showTimer:(double)duration
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(updateTimer:(double)remainingTime
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(hideTimer:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end 