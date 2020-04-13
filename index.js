const hasher = require('bindings')('hasherx16rv2.node');

const OUTPUT_BUFFER = Buffer.alloc(32);

module.exports = {

    /**
     * Hash 80-byte input.
     *
     * @param inputBuf {Buffer} 80-byte input to hash.
     * @param [outputBuf] {Buffer} Optional 32-byte buffer to copy result into.
     * @returns {Buffer} The outputBuf or a new Buffer containing the hash result.
     */
    x16rv2: x16rv2
};

function x16rv2(inputBuf, outputBuf) {

    _expectBuffer(inputBuf, 'inputBuf', 80);
    outputBuf && _expectBuffer(outputBuf, 'outputBuf', 32);

    hasher.x16rv2(inputBuf, OUTPUT_BUFFER);

    const resultBuf = outputBuf || Buffer.alloc(32);
    OUTPUT_BUFFER.copy(resultBuf, 0, 0);

    return resultBuf;
}


function _expectBuffer(buffer, name, size) {
    if (!Buffer.isBuffer(buffer))
        throw new Error(`"${name}" is expected to be a Buffer. Got ${(typeof buffer)} instead.`);

    if (size && buffer.length !== size)
        throw new Error(`"${name}" is expected to be exactly ${size} bytes. Got ${buffer.length} instead.`);
}