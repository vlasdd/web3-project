import { Injectable } from '@angular/core';
import { BigNumber, ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class ThirdwebParserService {
  constructor() { }

  convertToEth(value: BigNumber) {
    const valueInBigInt = BigNumber.from(value._hex)
    return ethers.utils.formatEther(valueInBigInt);
  }

  convertToWei(value: number) {
    const valueInWeiBigInt = ethers.utils.parseEther(value.toString());
    return valueInWeiBigInt.toString();
  }

  convertToNumber(value: BigNumber) {
    const valueInBigInt = BigNumber.from(value._hex)
    return valueInBigInt.toNumber();
  }

  convertToDate(value: BigNumber) {
    const valueInNumber = this.convertToNumber(value);
    return new Date(valueInNumber * 1000)
      .toString()
      .split(' ')
      .slice(1, 5)
      .join(' ')
      .split(':')
      .slice(0, 2)
      .join(':')
  }

  convertDateToSeconds(value: string) {
    return new Date(value).getTime() / 1000;
  }
}
