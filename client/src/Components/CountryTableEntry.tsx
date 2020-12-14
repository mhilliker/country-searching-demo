import React, { FunctionComponent } from 'react';
import { CountryInfo } from '../Common/ContryInfo';

interface CountryProps extends CountryInfo {}

export const CountryTableEntry: FunctionComponent<CountryProps> = (props: CountryProps) =>
  <tr>
      <td><img src={props.flagImage} alt={props.fullName + " flag"} width="70" /></td>
      <td>{props.fullName}</td>
      <td>{props.alphaCode2}</td>
      <td>{props.alphaCode3}</td>
      <td>{props.region}</td>
      <td>{props.subregion}</td>
      <td>{props.population}</td>
      <td>{props.languages.join(", ")}</td>
  </tr>