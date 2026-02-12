import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";

actor {
  type Website = Text;
  var production : Website = "";
  var draft : Website = "";
  let uncommitted : Map.Map<Nat, Website> = Map.empty<Nat, Website>();

  public shared ({ caller }) func publishDraftToProduction() : async () {
    if (draft == "") { Runtime.trap("Draft is empty") };
    production := draft;
  };
};
