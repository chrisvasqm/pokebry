import { Box, Image } from "@chakra-ui/react";
import { useState } from "react";
import { FALLBACK_IMAGE, getArtworkUrl, getSpriteUrl } from "../../common";

interface Props {
    id: number
}

/** Same breakpoint as Chakra's `sm`, used for both the source switch and the box size. */
const SMALL_SCREEN = '(max-width: 29.99em)';

/**
 * Upstream has the 96px sprite (~1 KB) and the 475px official artwork (~150 KB), both PNG.
 * Phones get the sprite at exactly 2x with crisp pixels; wider screens get the artwork.
 */
const PokemonArtwork = ({ id }: Props) => {
    // Setting img.src does not override a matching <source>, so a failed load drops the sources instead.
    const [failed, setFailed] = useState(false);
    const hasId = Number.isInteger(id);

    return (
        <Box as='picture' display='block'>
            {hasId && !failed && <source media={SMALL_SCREEN} srcSet={getSpriteUrl(id)} width={192} height={192} />}
            <Image
                id='details-image'
                data-testid='details-image'
                // The name is shown right below.
                alt=''
                src={hasId && !failed ? getArtworkUrl(id) : FALLBACK_IMAGE}
                onError={() => setFailed(true)}
                // React 18 does not know the camelCase fetchPriority prop; the lowercase attribute passes through.
                {...{ fetchpriority: 'high' }}
                width={250}
                height={250}
                boxSize={['192px', '250px']}
                objectFit={'contain'}
                // Pixel art upscaled on phones stays sharp; the artwork downscale on wider screens stays smooth.
                sx={{ imageRendering: ['pixelated', 'auto'] }}
            />
        </Box>
    )
}

export default PokemonArtwork;
