import { PlaceOrder } from '../useCases/PlaceOrder';
import { Registry } from '../di/Registry';

export function makePlaceOrder() {
  return Registry.getInstance().resolve<PlaceOrder>('PlaceOrder');
}
