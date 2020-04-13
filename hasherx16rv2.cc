#include <node.h>
#include <node_buffer.h>
#include <v8.h>
#include <stdint.h>
#include "nan.h"

extern "C" {
    #include "x16rv2.h"

}

#define THROW_ERROR_EXCEPTION(x) Nan::ThrowError(x)
#define THROW_ERROR_EXCEPTION_WITH_STATUS_CODE(x, y) NanThrowError(x, y)

using namespace node;
using namespace v8;

NAN_METHOD(x16rv2) {

    if (info.Length() < 2)
        return THROW_ERROR_EXCEPTION("You must provide two arguments.");

    Local<Object> argInput = Nan::To<Object>(info[0]).ToLocalChecked();
    Local<Object> argOutput = Nan::To<Object>(info[1]).ToLocalChecked();

    if(!Buffer::HasInstance(argInput))
            return THROW_ERROR_EXCEPTION("input should be a buffer object.");

    if(!Buffer::HasInstance(argOutput))
            return THROW_ERROR_EXCEPTION("output should be a buffer object.");

    char * input = Buffer::Data(argInput);
    char * output = Buffer::Data(argOutput);

    x16rv2_hash(input, output);
}

NAN_MODULE_INIT(init) {
    Nan::Set(target, Nan::New("x16rv2").ToLocalChecked(), Nan::GetFunction(Nan::New<FunctionTemplate>(x16rv2)).ToLocalChecked());
}

NODE_MODULE(nodex16rv2, init)
