import {
  BarbecueIcon,
  FurnishedIcon,
  GymIcon,
  JacuzziIcon,
  LivingDiningIcon,
  ParkingIcon,
  PoolIcon,
  TerraceIcon,
} from "./property-icons";

// The page is a server component, so it can only hand this card a string key —
// components don't survive the server/client boundary. Resolving the icon here
// keeps the property data plain enough to come from an API later.
const AMENITY_ICONS = {
  pool: PoolIcon,
  "living-dining": LivingDiningIcon,
  gym: GymIcon,
  terrace: TerraceIcon,
  barbecue: BarbecueIcon,
  jacuzzi: JacuzziIcon,
  furnished: FurnishedIcon,
  parking: ParkingIcon,
};

const AmenitiesCard = ({ amenities }) => (
  <div className="rounded-2xl border border-border-subtle bg-surface p-16 lg:px-26 lg:py-24">
    <ul className="grid grid-cols-2 gap-x-12 gap-y-18 lg:grid-cols-4 lg:gap-x-16 lg:gap-y-22">
      {amenities.map(({ label, labelPrefix, icon }) => {
        const Icon = AMENITY_ICONS[icon];

        return (
          <li key={label} className="flex items-center gap-12">
            {Icon ? (
              <Icon className="size-44 shrink-0 text-text-accent" />
            ) : null}
            <span className="text-body-xs font-semibold text-text-primary sm:text-body">
              {/* A qualifier the two narrow columns on mobile can't hold
                  without wrapping, so it only appears from `sm` up. */}
              {labelPrefix ? (
                <span className="hidden sm:inline">{labelPrefix}{" "}</span>
              ) : null}
              {label}
            </span>
          </li>
        );
      })}
    </ul>
  </div>
);

export { AmenitiesCard };
