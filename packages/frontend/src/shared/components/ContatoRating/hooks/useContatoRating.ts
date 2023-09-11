import { ChangeEvent, useEffect, useState } from 'react';
import {
  CONTATO_CLASSIFICACAO,
  CONTATO_CLASSIFICACAO_STARS,
  ContatoClassificacaoEnum,
} from '@/shared/constants';

export type UseContatoRatingProps = {
  value: ContatoClassificacaoEnum;
  onChange?: (value: ContatoClassificacaoEnum) => void;
};

export const useContatoRating = ({
  value,
  onChange,
}: UseContatoRatingProps) => {
  const [internalValue, setInternalValue] = useState<number>(0);
  const [tooltipTitle, setTooltipTitle] = useState<string>(
    CONTATO_CLASSIFICACAO[value],
  );

  useEffect(() => {
    setInternalValue(CONTATO_CLASSIFICACAO_STARS.indexOf(value));
  }, [value]);

  const handleChange = (event: ChangeEvent<{}>, eventValue: number | null) => {
    if (onChange) {
      onChange(CONTATO_CLASSIFICACAO_STARS[eventValue || 0]);
    }
  };

  const handleChangeActive = (
    event: ChangeEvent<{}>,
    eventValueActive: number,
  ) => {
    const activeValue = CONTATO_CLASSIFICACAO_STARS[eventValueActive];
    if (activeValue) {
      setTooltipTitle(CONTATO_CLASSIFICACAO[activeValue]);
    }
  };

  return {
    internalValue,
    tooltipTitle,
    handleChange,
    handleChangeActive,
  };
};
