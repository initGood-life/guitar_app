import { SerializedError } from '../store/types/serialized.types';

function isSerializedError(err: unknown): err is SerializedError {
  return (err as SerializedError).data !== undefined;
}
export default isSerializedError;
