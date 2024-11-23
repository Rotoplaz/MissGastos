import { Text } from '@ui-kitten/components';
import React from 'react';

interface Props {
    totalMoney: number;
}

export const EmojiStatus = ({ totalMoney  }:Props) => {

    const getAvatarSource = () => {
        if (totalMoney >= 5000) {
          return "😁";
        } else if (totalMoney > 100) {
          return "😐";
        } else if (totalMoney < 100) {
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