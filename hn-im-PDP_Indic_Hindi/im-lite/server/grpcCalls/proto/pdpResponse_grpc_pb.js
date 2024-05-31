// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var pdpResponse_pb = require('./pdpResponse_pb.js');

function serialize_PDP_PDPRequest(arg) {
  if (!(arg instanceof pdpResponse_pb.PDPRequest)) {
    throw new Error('Expected argument of type PDP.PDPRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PDP_PDPRequest(buffer_arg) {
  return pdpResponse_pb.PDPRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_PDP_PDPResponse(arg) {
  if (!(arg instanceof pdpResponse_pb.PDPResponse)) {
    throw new Error('Expected argument of type PDP.PDPResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PDP_PDPResponse(buffer_arg) {
  return pdpResponse_pb.PDPResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var PDPService = exports.PDPService = {
  getProductDetails: {
    path: '/PDP.PDP/GetProductDetails',
    requestStream: false,
    responseStream: false,
    requestType: pdpResponse_pb.PDPRequest,
    responseType: pdpResponse_pb.PDPResponse,
    requestSerialize: serialize_PDP_PDPRequest,
    requestDeserialize: deserialize_PDP_PDPRequest,
    responseSerialize: serialize_PDP_PDPResponse,
    responseDeserialize: deserialize_PDP_PDPResponse,
  },
};

exports.PDPClient = grpc.makeGenericClientConstructor(PDPService);
