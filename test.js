'use strict';

const hasher = require('./index.js');

process.title = 'x16rv2-test';

const EXPECTED_HASHES = [
    /* 00 */ '3d76496210f5f70b66ef3ec2c664240f83be6ebd2be0286bf6f912dc871d4ce7',
    /* 01 */ '05732ce4ac4a96415691b7fee4ef2b6592782a460d12e3c4298a1c6a0bb7fd5f',
    /* 02 */ '4426a9eab7d128e9ebe14ec3968ce9655964215bfb248ad80946aefb2726ac08',
    /* 03 */ '56d8bdf2598f6f6b150e37f3046458eea6d142b30bf7cddb7bf6169679a376ed',
    /* 04 */ 'd1a47f19d3ba4dbfe0dd2a8fe937d038a6859fc4dffec61fce08c7f764072501',
    /* 05 */ '697a67b2ab6d8d65fb0feeab232cee6124962c68fcce74638d48db5b524ecc23',
    /* 06 */ '945d6dedde22beff8a17cc33c89bc3182daab56e0e8b972b494c14cd3fec01cb',
    /* 07 */ '274415443fc1b61da0a5dc7d16cae1cce01aaba1277f74d283356e62e087b7ac',
    /* 08 */ 'f32034735a378d31b19a7469051172897ebd69ef5ddf4a3749906fa8fa9f8a36',
    /* 09 */ '8da0d240a6827ddfde3babe263ec32c13ff554290b9d5f941339172857c57614',
    /* 10 */ '8dbb0cdbb0a01180592ee0367c55252ae8a2df6bc1cb2ebf33a72031f5a6146b',
    /* 11 */ '7b4a3be73671d03bd5fa3d7722f730d292d0ccc2aa94608f390d9abbd37d12d3',
    /* 12 */ '662028acfc933929565d12bc22401185c7a9c5b221a893d31ad333d7becaaaa2',
    /* 13 */ '9d29d3f0ef3312beadde524e6d18f52a2a024f38e555f0597e2e0675a335f06d',
    /* 14 */ 'c969645ec4cb207cfd325e598b7d3d5a2d2b5895605783b800193a08b60018a0',
    /* 15 */ 'def76bdd844cdf4f662b626c33a73c67ab1232a87d691810e6ecb3202578fb64',
    /* 16 */ 'eb04587b1fd6f5895d917bff4aea3fca9bb09640da3fcf5e3a65d69a3ba47e1a',
    /* 17 */ '7ff43213cf046433389ac4e77f56dca541f2a5a3fd8195ededdbe8beadcb6d1b',
    /* 18 */ '695140aa4bd2edf66cc80092a138f685ff6f3a12bc9177dd225052393a9828a2',
    /* 19 */ '375c17296b84584b5edea4934ba82e0fcd15285383400768180ddd25410fe9ad',
    /* 20 */ '124f960d594dc4b777133c12e2a7ce8d8959d35daf3c196829ab248b5d1a768f',
    /* 21 */ '252978f0885a98acb1bdaaa7b382f7c33d1f5eb382c935d9107f4634b0fea368',
    /* 22 */ '6201fc84f7ba6179034f2f332882197bc33063d5c8ae738c722270779b76d8e8',
    /* 23 */ '5b0598c92da4e7fdf5540c8d476f4272a11648f9cbbab1045fb7d7baff70ce4e',
    /* 24 */ 'd7fd28eb1eed7a10b0d1896e44686079b24d791191816d0c5534056ea7f37bce',
    /* 25 */ 'c1b2786f9c375d2ec287506b0121bd45a23993dc40e941ef4368058aec69dbe7',
    /* 26 */ '2e89c4c10f99454e418893d577b5f9ec78736f6233710696dad2fc3b2b6260fd',
    /* 27 */ '7375472d76bb5892e43087d6c5b81c4212f639b88b74339af5d8c17b500fe219',
    /* 28 */ '69da721c3090465f1ab305e85e0b05210d05b74c9a6371b367034d2d08d8058f',
    /* 29 */ 'c181dfff7cd8ec5c20c78279d5aece34a5b9b29b374cc809e8837b47a257f3be',
    /* 30 */ '28e66bde03ac7bb9b70a60b2813f8d2013cb7f54c30ef959c3d0254c2985a005',
    /* 31 */ 'f21f49cb20fd5ac58d10b474010363442e31c49c74861e7a99fd1fe3194dc27b'
];

for (let i = 0; i < 32; i++) {
    const input = createInput(i);
    test(i, input, EXPECTED_HASHES[i]);
}

console.log('Tests complete.');


function createInput(index) {

    let prevBlock = 'ab783e17a48c060f9899b7287bf66bc1e9c13eef4e61745db03d0534a3ecb580';

    for (let i = 0; i < index; i++) {
        const firstByte = prevBlock.substr(0, 2);
        prevBlock = prevBlock.substr(2) + firstByte;
    }

    const hex = '00000000' +
        /* prev block hash */ prevBlock +
        /* merkle root     */ '74c6890ff98cf6295fc8b2deb4172e0f4490e4e3f3d720f0fd22491340f35913' +
        /* time            */ '6ff69f5b' +
        /* bits            */ 'ffff0020' +
        '00000000';

    return Buffer.from(hex, 'hex');
}


function test(index, input, expected) {

    console.log(`Test ${index}:`)

    console.log(`  Expected:    ${expected}`)

    const hash = hasher.x16rv2(input).toString('hex');

    console.log(`  Hash result: ${hash}`);

    if (hash !== expected)
        throw new Error(`Invalid hash result.`);
}