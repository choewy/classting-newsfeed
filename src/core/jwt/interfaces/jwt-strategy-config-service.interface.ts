export interface JwtStrategyConfig {
  getSecretOrKey(): string;
}
