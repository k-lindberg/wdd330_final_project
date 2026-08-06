export async function openSetModal(setId) {
    const setDetails = await rebrick.getSetById(setId);
    const minifigs = await rebrick.getMinifigsForSet(setId);

    renderModal(setDetails, minifigs);
}