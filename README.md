# ethers-expanded

this libs is expand ethers libs
make it easy to use the utilities fn

---
# Get Started
install
```npm
npm install @aumstack/ethers-expanded
```

---
# Functions

## integrate with native Typescript Number 

### from number to ERC20 form
```ts
const tokenDecimal = 8;
const tokenAmount = 100;
const tokenBigNumber = tokenAmount.toErc20(tokenDecimal);
console.log(tokenBigNumber); // BigNumber { _hex: '0x02540be400', _isBigNumber: true }
```

### from BigNumber(token form) to number

```ts
const tokenDecimal = 8;
const tokenBigNumber = BigNumber.from(100).mul(10 ** tokenDecimal);
const tokenAmount = tokenBigNumber.erc20ToNumber(8);
console.log(tokenAmount); // 100
```

## integrate with native Typescript String

### convert string to bytes32
```ts
const str = "ABC";
const bytes32 = str.toBytes32();
console.log(bytes32);    // EncodeBytes32 { type: 'bytes32', _value: '0x4142430000000000000000000000000000000000000000000000000000000000' }
```

### convert EncodeBytes32 to string
```ts
const bytes32 = new EncodeBytes32( "0x4142430000000000000000000000000000000000000000000000000000000000");
const str = bytes32.toString();
console.log(str); // ABC
```


### make abi function like solidity **ABI Encoding functions**

```ts
const ABCInBytes32 = new EncodeBytes32(
	"0x4142430000000000000000000000000000000000000000000000000000000000",
);
const DEFInBytes32 = new EncodeBytes32("DEF".toBytes32().value);

const packed = abi.encodePacked([ABCInBytes32, DEFInBytes32]);
console.log(packed); // EncodeBytes { type: 'bytes', _value: '0x41424300000000000000000000000000000000000000000000000000000000004445460000000000000000000000000000000000000000000000000000000000'
}
```

### keccak256

```ts
const ABCInBytes32 = new EncodeBytes32(
	"0x4142430000000000000000000000000000000000000000000000000000000000",
);
const DEFInBytes32 = new EncodeBytes32("DEF".toBytes32().value);

const hash = keccak256([ABCInBytes32, DEFInBytes32]);
console.log(hash); // EncodeBytes32 { type: 'bytes32', _value: '0xdd1528c24c9daf22fdb3338f40c22123a13af2af15e39abaea67df5bb67d4217'
}
```


