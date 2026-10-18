import { useSearchParams } from "react-router-dom";
import { PokemonType, isPokemonType } from "../models/PokemonType";

export const MAX_SELECTED_TYPES = 2;
const PARAM = 'type';

/** Selected types live in the URL (`?type=fire&type=flying`) so a filtered list can be shared and survives Back. */
const useTypeFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const selected = searchParams.getAll(PARAM)
        .filter(isPokemonType)
        .filter((type, index, all) => all.indexOf(type) === index)
        .slice(0, MAX_SELECTED_TYPES);

    const update = (types: PokemonType[]) => {
        const next = new URLSearchParams(searchParams);
        next.delete(PARAM);
        types.forEach(type => next.append(PARAM, type));
        setSearchParams(next, { replace: true });
    }

    const toggle = (type: PokemonType) => {
        if (selected.includes(type)) return update(selected.filter(other => other !== type));
        // Picking a third type drops the oldest one so the two most recent picks stay.
        update([...selected, type].slice(-MAX_SELECTED_TYPES));
    }

    return { selected, toggle, clear: () => update([]) };
}

export default useTypeFilter;
