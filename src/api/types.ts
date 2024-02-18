type Sprites = {
  front_default: string | null;
  dream_world: string | null;
};

export type Type = {
  slot: number;
  type: {name: string};
};

export type Stat = {
  base_stat: number;
  stat: {name: string};
};

type Ability = {
  ability: {name: string; url: string};
  is_hidden: false;
};

type Effect = {
  effect: string;
  short_effect: string;
  language: {name: string};
};

export type Pagination<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<T>;
};

export type PokemonItem = {
  name: string;
  url: string;
};

export type Pokemon = {
  sprites: Sprites;
  name: string;
  height: number;
  weight: number;
  types: Array<Type>;
  stats: Array<Stat>;
  abilities: Array<Ability>;
};

export type AbilityDetail = {
  name: string;
  effect_entries: Array<Effect>;
};
