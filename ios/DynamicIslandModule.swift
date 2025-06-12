import Foundation
import ActivityKit

@objc(DynamicIslandModule)
class DynamicIslandModule: NSObject {
  private var timerActivity: Activity<TimerAttributes>?
  
  @objc
  func showTimer(_ duration: Double, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
    guard ActivityAuthorizationInfo().areActivitiesEnabled else {
      rejecter("ERROR", "Live Activities not supported", nil)
      return
    }
    
    let initialContentState = TimerAttributes.ContentState(
      duration: duration,
      remainingTime: duration
    )
    
    let activityAttributes = TimerAttributes()
    
    do {
      timerActivity = try Activity.request(
        attributes: activityAttributes,
        contentState: initialContentState,
        pushType: nil
      )
      resolver(nil)
    } catch {
      rejecter("ERROR", "Failed to start timer activity", error)
    }
  }
  
  @objc
  func updateTimer(_ remainingTime: Double, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
    Task {
      await timerActivity?.update(using: TimerAttributes.ContentState(
        duration: timerActivity?.contentState.duration ?? 0,
        remainingTime: remainingTime
      ))
      resolver(nil)
    }
  }
  
  @objc
  func hideTimer(_ resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
    Task {
      await timerActivity?.end(dismissalPolicy: .immediate)
      resolver(nil)
    }
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}

struct TimerAttributes: ActivityAttributes {
  public struct ContentState: Codable, Hashable {
    var duration: Double
    var remainingTime: Double
  }
} 