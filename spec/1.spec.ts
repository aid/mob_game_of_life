import 'jasmine';
import { World } from "../src/gol";

const EMPTY_5x5: string[] = [
    '     ',
    '     ',
    '     ',
    '     ',
    '     '];

const POPULATED_5x5: string[] = [
    '  #  ',
    '  #  ',
    '  #  ',
    ' # # ',
    '#   #'];

const BLOCK = [
    '    ',
    ' ## ',
    ' ## ',
    '    '];

const BLINKER_1 = [
    '     ',
    '  #  ',
    '  #  ',
    '  #  ',
    '     '];
        
const BLINKER_2 = [
    '     ',
    '     ',
    ' ### ',
    '     ',
    '     '];

const TOAD_1 = [
    '      ',
    '   #  ',
    ' #  # ',
    ' #  # ',
    '  #   ',
    '      '];

const TOAD_2 = [
    '      ',
    '      ',
    '  ### ',
    ' ###  ',
    '      ',
    '      '];
        
const BEACON_1 = [
    '      ',
    ' ##   ',
    ' #    ',
    '    # ',
    '   ## ',
    '      '];

const BEACON_2 = [
    '      ',
    ' ##   ',
    ' ##   ',
    '   ## ',
    '   ## ',
    '      '];

const PULSAR_1 = [
    '               ',
    '   ###   ###   ',
    '               ',
    ' #    # #    # ',
    ' #    # #    # ',
    ' #    # #    # ',
    '   ###   ###   ',
    '               ',
    '   ###   ###   ',
    ' #    # #    # ',
    ' #    # #    # ',
    ' #    # #    # ',
    '               ',
    '   ###   ###   ',
    '               '];

const PULSAR_2 = [
    '    #     #    ',
    '    #     #    ',
    '    ##   ##    ',
    '               ',
    '###  ## ##  ###',
    '  # # # # # #  ',
    '    ##   ##    ',
    '               ',
    '    ##   ##    ',
    '  # # # # # #  ',
    '###  ## ##  ###',
    '               ',
    '    ##   ##    ',
    '    #     #    ',
    '    #     #    '];


const PULSAR_3 = [
    '               ',
    '   ##     ##   ',
    '    ##   ##    ',
    ' #  # # # #  # ',
    ' ### ## ## ### ',
    '  # # # # # #  ',
    '   ###   ###   ',
    '               ',
    '   ###   ###   ',
    '  # # # # # #  ',
    ' ### ## ## ### ',
    ' #  # # # #  # ',
    '    ##   ##    ',
    '   ##     ##   ',
    '               '];

describe("World", () => {

    it("Can be created for fixed size", () => {
        const sut = new World(10, 10);
        expect(sut.width).toBe(10);
        expect(sut.height).toBe(10);
    });

    it("Can output it's current state", () => {
        const sut = new World(5, 5);
        const output = sut.toArrayofStrings();
        expect(output).toEqual(EMPTY_5x5);
    });

    it("Can create an empty world from string and retrieve the same", () => {
        const sut =  World.fromArrayOfStrings(EMPTY_5x5);
        const output = sut.toArrayofStrings();
        expect(output).toEqual(EMPTY_5x5);
    });

    it("Can create a populated world from string and retrieve the same", () => {
        const sut =  World.fromArrayOfStrings(POPULATED_5x5);
        const output = sut.toArrayofStrings();
        expect(output).toEqual(POPULATED_5x5);
    });

    it("Can set a cell to live and retrieve the same", () => {
        const sut =  new World(4, 4);
        // set some values
        sut.setLive(0,0);
        sut.setLive(2,3);
        sut.setLive(1,3);
        sut.setLive(3,3);
        // ensure all of the expected values are retrvied
        expect(sut.get(0,0)).toBe(true);
        expect(sut.get(1,0)).toBe(false);
        expect(sut.get(2,0)).toBe(false);
        expect(sut.get(3,0)).toBe(false);
        expect(sut.get(0,1)).toBe(false);
        expect(sut.get(1,1)).toBe(false);
        expect(sut.get(2,1)).toBe(false);
        expect(sut.get(3,1)).toBe(false);
        expect(sut.get(0,2)).toBe(false);
        expect(sut.get(1,2)).toBe(false);
        expect(sut.get(2,2)).toBe(false);
        expect(sut.get(3,2)).toBe(false);
        expect(sut.get(0,3)).toBe(false);
        expect(sut.get(1,3)).toBe(true);
        expect(sut.get(2,3)).toBe(true);
        expect(sut.get(3,3)).toBe(true);
    });

    it("Can set a cell to live and retrieve the same", () => {
        const sut =  new World(5, 5);
        // Set some values
        sut.setLive(0,0);
        sut.setLive(2,3);
        sut.setLive(1,4);
        sut.setLive(4,4);
        const output = sut.toArrayofStrings();
        expect(output).toEqual([
            '#    ',
            '     ',
            '     ',
            '  #  ',
            ' #  #']);
    });

    it("Correct number of neighbors for cell - 1", () => {
        const sut =  World.fromArrayOfStrings([
            '#   ',
            ' #  ',
            '    ',
            '    ']);
        expect(sut.getNeighbourCount(0,0)).withContext("[0,0]").toBe(1);
        expect(sut.getNeighbourCount(1,0)).withContext("[1,0]").toBe(2);
        expect(sut.getNeighbourCount(2,0)).withContext("[2,0]").toBe(1);
        expect(sut.getNeighbourCount(3,0)).withContext("[3,0]").toBe(0);
        expect(sut.getNeighbourCount(0,1)).withContext("[0,1]").toBe(2);
        expect(sut.getNeighbourCount(1,1)).withContext("[1,1]").toBe(1);
        expect(sut.getNeighbourCount(2,1)).withContext("[2,1]").toBe(1);
        expect(sut.getNeighbourCount(3,1)).withContext("[3,1]").toBe(0);
        expect(sut.getNeighbourCount(0,2)).withContext("[0,2]").toBe(1);
        expect(sut.getNeighbourCount(1,2)).withContext("[1,2]").toBe(1);
        expect(sut.getNeighbourCount(2,2)).withContext("[2,2]").toBe(1);
        expect(sut.getNeighbourCount(3,2)).withContext("[3,2]").toBe(0);
        expect(sut.getNeighbourCount(0,3)).withContext("[0,3]").toBe(0);
        expect(sut.getNeighbourCount(1,3)).withContext("[1,3]").toBe(0);
        expect(sut.getNeighbourCount(2,3)).withContext("[2,3]").toBe(0);
        expect(sut.getNeighbourCount(3,3)).withContext("[3,3]").toBe(0);
    });

    it("Correct number of neighbors on block of neighbor count - 1", () => {
        const sut =  World.fromArrayOfStrings([
            '#   ',
            ' #  ',
            '    ',
            '    ']);
        expect(sut.getNeighbourCounts()).toEqual([
            [1, 2, 1, 0],
            [2, 1, 1, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0]]);
    });

    it("Correct number of neighbors on block of neighbor count - 2", () => {
        const sut =  World.fromArrayOfStrings([
            '# ##',
            ' #  ',
            ' ## ',
            '#  #']);
        expect(sut.getNeighbourCounts()).toEqual([
            [1, 3, 2, 1],
            [3, 4, 5, 3],
            [3, 3, 3, 2],
            [1, 3, 3, 1]]);
    });

    it("One game of life round - Block", () => {
        const sut =  World.fromArrayOfStrings(BLOCK);
        sut.tick();
        expect(sut.toArrayofStrings()).toEqual(BLOCK);
    });

    it("One game of life round - Blinker 1", () => {
        const sut =  World.fromArrayOfStrings(BLINKER_1);
        sut.tick();
        expect(sut.toArrayofStrings()).toEqual(BLINKER_2);
    });

    it("One game of life round - Blinker 2", () => {
        const sut =  World.fromArrayOfStrings(BLINKER_2);
        sut.tick();
        expect(sut.toArrayofStrings()).toEqual(BLINKER_1);
    });

    it("One game of life round - Toad 1", () => {
        const sut =  World.fromArrayOfStrings(TOAD_1);
        sut.tick();
        expect(sut.toArrayofStrings()).toEqual(TOAD_2);
    });

    it("One game of life round - Toad 2", () => {
        const sut =  World.fromArrayOfStrings(TOAD_2);
        sut.tick();
        expect(sut.toArrayofStrings()).toEqual(TOAD_1);
    });

    it("One game of life round - Beacon 1", () => {
        const sut =  World.fromArrayOfStrings(BEACON_1);
        sut.tick();
        expect(sut.toArrayofStrings()).toEqual(BEACON_2);
    });

    it("One game of life round - Beacon 2", () => {
        const sut =  World.fromArrayOfStrings(BEACON_2);
        sut.tick();
        expect(sut.toArrayofStrings()).toEqual(BEACON_1);
    });

    it("One game of life round - Pulsar 1", () => {
        const sut =  World.fromArrayOfStrings(PULSAR_1);
        sut.tick();
        expect(sut.toArrayofStrings()).toEqual(PULSAR_2);
    });

    it("One game of life round - Pulsar 2", () => {
        const sut =  World.fromArrayOfStrings(PULSAR_2);
        sut.tick();
        expect(sut.toArrayofStrings()).toEqual(PULSAR_3);
    });
    
    it("One game of life round - Pulsar 3", () => {
        const sut =  World.fromArrayOfStrings(PULSAR_3);
        sut.tick();
        expect(sut.toArrayofStrings()).toEqual(PULSAR_1);
    });

});
