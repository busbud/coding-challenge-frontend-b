import { Departure } from '@/store/departures/state';
import BudSkeleton from '@/components/BudSkeleton';

import BudTravelCard from '@/components/BudTravelCard';
import { Operator } from '@/store/operators/state';

type BudDeparturesProps = {
  departures: Departure[];
  operators: Operator[];
  loading: boolean;
};

const BudDepartures: React.FC<BudDeparturesProps> = ({
  departures,
  operators,
  loading,
}) =>
  (
    <div className="mt-8 px-8 pb-8">
      {loading ? (
        <BudSkeleton />
      ) : (
        departures.map(departure =>
          (
            <BudTravelCard
              key={departure.id}
              departure={departure}
              operator={operators.find(op =>
                op.id === departure.operator_id)}
            />
          ))
      )}
    </div>
  );

export default BudDepartures;
