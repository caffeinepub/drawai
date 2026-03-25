import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import OutCall "http-outcalls/outcall";
import List "mo:core/List";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

actor {
  include MixinStorage();

  // Types
  type Feedback = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  module Feedback {
    public func compare(feedback1 : Feedback, feedback2 : Feedback) : Order.Order {
      Int.compare(feedback1.timestamp, feedback2.timestamp);
    };
  };

  type TutorialStep = {
    description : Text;
  };

  type Tutorial = {
    subject : Text;
    steps : [TutorialStep];
    completedCount : Nat;
  };

  module Tutorial {
    public func compare(tutorial1 : Tutorial, tutorial2 : Tutorial) : Order.Order {
      Text.compare(tutorial1.subject, tutorial2.subject);
    };
  };

  type FileReference = {
    url : Text;
    name : Text;
    blob : Storage.ExternalBlob;
  };

  // Persistent storage
  let tutorials = Map.empty<Text, Tutorial>();
  let files = Map.empty<Text, FileReference>();

  // API methods
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Feedback submission
  public shared ({ caller }) func submitFeedback(name : Text, email : Text, message : Text) : async () {
    let newFeedback : Feedback = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    let feedbackList = List.empty<Feedback>();
    feedbackList.add(newFeedback);
  };

  public query ({ caller }) func getAllFeedback() : async [Feedback] {
    let feedbackList = List.empty<Feedback>();
    feedbackList.toArray().sort().reverse();
  };

  // Wikipedia proxy
  public shared ({ caller }) func fetchWikipediaSummary(searchTerm : Text) : async Text {
    let url = "https://en.wikipedia.org/api/rest_v1/page/summary/" # searchTerm;
    await OutCall.httpGetRequest(url, [], transform);
  };

  // Tutorials
  public query ({ caller }) func getAllTutorials() : async [Tutorial] {
    tutorials.values().toArray().sort();
  };

  public shared ({ caller }) func saveTutorial(subject : Text, steps : [TutorialStep]) : async () {
    let newTutorial : Tutorial = {
      subject;
      steps;
      completedCount = 0;
    };
    tutorials.add(subject, newTutorial);
  };

  public shared ({ caller }) func incrementCompletedCount(subject : Text) : async Nat {
    switch (tutorials.get(subject)) {
      case (null) { Runtime.trap("No tutorial found for subject " # subject) };
      case (?tutorial) {
        let updatedTutorial : Tutorial = {
          subject = tutorial.subject;
          steps = tutorial.steps;
          completedCount = tutorial.completedCount + 1;
        };
        tutorials.add(subject, updatedTutorial);
        updatedTutorial.completedCount;
      };
    };
  };
};
