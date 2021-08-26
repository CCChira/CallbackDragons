import {Typography} from '@material-ui/core';
import React from 'react';

export default function MostUsedByUserComponent({classes, repos}) {
  let languages = repos?.reduce?.((total, item) => {
    const { language } = item;

    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1 };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
      };
    }

    return total;
  }, {});

  languages = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 3);

  let sum = 0;
  for (let i = 0; i < languages.length; ++i) {
    sum += languages[i].value;
  }

  for (let i = 0; i < languages.length; ++i) {
    languages[i].value = ((languages[i].value * 100) / sum).toFixed(2);
  }

  return (
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: '5px'}}>
      <Typography className={classes.userName} style={{marginRight: '10px'}}>
        Most used languages:
      </Typography>
        {languages.map((language, index) => {
          return (
            <Typography key={index} style={{marginRight: '10px'}}>
              {language.label}: {language.value}%
            </Typography>
          );
        })}
    </div>
  );
}
