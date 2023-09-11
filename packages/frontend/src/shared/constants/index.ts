export const DEFAULT_SNACKBAR_TIMER = 4000;

export enum ClienteSexoEnum {
  MASCULINO = 'MASCULINO',
  FEMININO = 'FEMININO',
}

export const CLIENTE_SEXO = {
  [ClienteSexoEnum.MASCULINO]: 'Masculino',
  [ClienteSexoEnum.FEMININO]: 'Feminino',
};

export const OptionsSexo = Object.keys(CLIENTE_SEXO).map((key) => ({
  label: CLIENTE_SEXO[key as keyof typeof ClienteSexoEnum],
  value: key,
}));

export enum ContatoClassificacaoEnum {
  INDEFINIDO = 'INDEFINIDO',
  RUIM = 'RUIM',
  BOM = 'BOM',
  EXCELENTE = 'EXCELENTE',
}

export const CONTATO_CLASSIFICACAO = {
  [ContatoClassificacaoEnum.INDEFINIDO]: 'Indefinido',
  [ContatoClassificacaoEnum.RUIM]: 'Ruim',
  [ContatoClassificacaoEnum.BOM]: 'Bom',
  [ContatoClassificacaoEnum.EXCELENTE]: 'Excelente',
};

export const CONTATO_CLASSIFICACAO_STARS = [
  ContatoClassificacaoEnum.INDEFINIDO,
  ContatoClassificacaoEnum.RUIM,
  ContatoClassificacaoEnum.BOM,
  ContatoClassificacaoEnum.EXCELENTE,
];

export enum ContatoMarcadorEnum {
  PESSOAL = 'PESSOAL',
  TRABALHO = 'TRABALHO',
  AVOS = 'AVOS',
  FILHO = 'FILHO',
  MAE = 'MAE',
  PAI = 'PAI',
  NETO = 'NETO',
  SOBRINHO = 'SOBRINHO',
  TIO = 'TIO',
}

export const CONTATO_MARCADOR = {
  [ContatoMarcadorEnum.PESSOAL]: 'Pessoal',
  [ContatoMarcadorEnum.TRABALHO]: 'Trabalho',
  [ContatoMarcadorEnum.AVOS]: 'Avô / Avó',
  [ContatoMarcadorEnum.FILHO]: 'Filho(a)',
  [ContatoMarcadorEnum.MAE]: 'Mãe',
  [ContatoMarcadorEnum.PAI]: 'Pai',
  [ContatoMarcadorEnum.NETO]: 'Neto(a)',
  [ContatoMarcadorEnum.SOBRINHO]: 'Sobrinho(a)',
  [ContatoMarcadorEnum.TIO]: 'Tio(a)',
};

export enum ClienteTipoEnum {
  FISICA = 'FISICA',
  JURIDICA = 'JURIDICA',
  ESTRANGEIRA = 'ESTRANGEIRA',
  INDEFINIDO = 'INDEFINIDO',
}

export enum ERRORS_API {
  ERROR_401 = 401,
  ERROR_403 = 403,
  ERROR_406 = 'Esse dado já está cadastrado.',
}
