import { Text } from '@ui-kitten/components';
import React from 'react';

interface Props {
    totalMoney: number;
}

export const EmojiStatus = ({ totalMoney  }:Props) => {

    const getAvatarSource = () => {
        if (totalMoney === 1) {
          return "😁";
        } else if (totalMoney === 2) {
          return "😐";
        } else if (totalMoney === 0) {
          return "😭";
        }
      };

    return (
        <>
          <Text style={{fontSize: 150}}>
            {getAvatarSource()}
          </Text>

        </>
    )
}