import { Box, Image } from "@chakra-ui/react";
import { useState } from "react";
import { FALLBACK_IMAGE, FIRST_FORM_ID, getArtworkUrl, getSpriteUrl } from "../../common";
import Pokemon from "../../models/Pokemon";

interface Props {
    id: number
    /** Undefined while loading; once loaded, its image URLs win over the id-based guess. */
    pokemon?: Pokemon
}

/** Same breakpoint as Chakra's `sm`, used for both the source switch and the box size. */
const SMALL_SCREEN = '(max-width: 29.99em)';

/**
 * Upstream has the 96px sprite (~1 KB) and the 475px official artwork (~150 KB), both PNG.
 * Phones get the sprite at exactly 2x with crisp pixels; wider screens get the artwork.
 * Before the data arrives the URLs are built from the id, so the image loads in parallel with it.
 */
const PokemonArtwork = ({ id, pokemon }: Props) => {
    // Setting img.src does not override a matching <source>, so a failed URL drops out through state instead.
    const [failed, setFailed] = useState<string[]>([]);
    // Forms often have no image upstream: they wait for the data instead of guessing.
    const canGuess = Number.isInteger(id) && id < FIRST_FORM_ID;
    const artwork = pokemon ? pokemon.sprites.other['official-artwork'].front_default : canGuess ? getArtworkUrl(id) : undefined;
    const sprite = pokemon ? pokemon.sprites.front_default : canGuess ? getSpriteUrl(id) : undefined;
    const usable = (url: string | null | undefined) => url && !failed.includes(url) ? url : undefined;
    const fail = (url: string) => setFailed(urls => [...urls, url]);

    const artworkSrc = usable(artwork);
    const spriteSrc = usable(sprite);
    const src = artworkSrc ?? spriteSrc ?? FALLBACK_IMAGE;

    return (
        <Box as='picture' display='block'>
            {spriteSrc && spriteSrc !== src && <source media={SMALL_SCREEN} srcSet={spriteSrc} width={192} height={192} />}
            <Image
                id='details-image'
                data-testid='details-image'
                // The name is shown right below.
                alt=''
                src={src}
                // The failing URL is whichever the browser picked: the phone source or the img src.
                onError={event => fail(event.currentTarget.currentSrc || src)}
                // React 18 does not know the camelCase fetchPriority prop; the lowercase attribute passes through.
                {...{ fetchpriority: 'high' }}
                htmlWidth={250}
                htmlHeight={250}
                boxSize={['192px', '250px']}
                objectFit={'contain'}
                // Pixel art upscaled on phones stays sharp; the artwork downscale on wider screens stays smooth.
                sx={{ imageRendering: ['pixelated', 'auto'] }}
            />
        </Box>
    )
}

export default PokemonArtwork;
