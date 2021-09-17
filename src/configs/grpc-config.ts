import { ClientOptions, Transport } from '@nestjs/microservices';

export const grpcConfig = (
  packages: string[],
  protoFiles: string[],
  url: string,
): ClientOptions => {
  return {
    transport: Transport.GRPC,
    options: {
      package: packages,
      protoPath: protoFiles,
      url,
    },
  };
};
