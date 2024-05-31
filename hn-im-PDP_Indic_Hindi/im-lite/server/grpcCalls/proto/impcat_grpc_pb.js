// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var impcat_pb = require('./impcat_pb.js');

function serialize_Impcat_ImpcatRequest(arg) {
  if (!(arg instanceof impcat_pb.ImpcatRequest)) {
    throw new Error('Expected argument of type Impcat.ImpcatRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Impcat_ImpcatRequest(buffer_arg) {
  return impcat_pb.ImpcatRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Impcat_ImpcatResponse(arg) {
  if (!(arg instanceof impcat_pb.ImpcatResponse)) {
    throw new Error('Expected argument of type Impcat.ImpcatResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Impcat_ImpcatResponse(buffer_arg) {
  return impcat_pb.ImpcatResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ImpcatService = exports.ImpcatService = {
  impcatService: {
    path: '/Impcat.Impcat/ImpcatService',
    requestStream: false,
    responseStream: false,
    requestType: impcat_pb.ImpcatRequest,
    responseType: impcat_pb.ImpcatResponse,
    requestSerialize: serialize_Impcat_ImpcatRequest,
    requestDeserialize: deserialize_Impcat_ImpcatRequest,
    responseSerialize: serialize_Impcat_ImpcatResponse,
    responseDeserialize: deserialize_Impcat_ImpcatResponse,
  },
};

exports.ImpcatClient = grpc.makeGenericClientConstructor(ImpcatService);
