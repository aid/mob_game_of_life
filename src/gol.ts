// https://prod.liveshare.vsengsaas.visualstudio.com/join?2B1382BB9B193017783BBA811B4A058B5E49

const OFFSETS = [
    { x: -1, y: -1},    { x: 0, y: -1},     { x: 1, y: -1},
    { x: -1, y: 0},     /* OURSELF  */      { x: 1, y: 0},
    { x: -1, y: 1},     { x: 0, y: 1},      { x: 1, y: 1},
];

export class State {
    private data: boolean[][] = null;
    public width: number = 0;
    public height: number = 0 ;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.data = this.createEmptyState();
    }

    private createEmptyState(): boolean[][] {
        let result: boolean[][] = new Array(this.height);
        for (let y = 0 ; y < this.height ; y++) {
            result[y] = new Array(this.width);
            for (let x = 0 ; x < this.width ; x++ ) {
                result[y][x] = false;
            }
        }
        return result;
    }

    public setFromArrayOfStrings(width: number, height: number, givenState: string[]) : void {
        if (width != this.width || height != this.height) {
            throw RangeError;
        } else {
            for (let x = 0 ; x < this.width ; x++ ) {
                for (let y = 0 ; y < this.height ; y++) {
                    this.data[y][x] = givenState[y][x] == '#' ? true : false;
                }
            }
        }
    }

    public setAllDead() : void {
        for (let y = 0 ; y < this.height ; y++) {
            for (let x = 0 ; x < this.width ; x++ ) {
                this.data[y][x] = false;
            }
        }
    }


    public setAllLive() : void {
        for (let y = 0 ; y < this.height ; y++) {
            for (let x = 0 ; x < this.width ; x++ ) {
                this.data[y][x] = true;
            }
        }
    }

    public setRandom(liveCount: number) : void {
        let x: number = 0;
        let y: number = 0;
        let done: boolean = false;

        this.setAllDead();

        for (let live = 0 ; live < liveCount ; live ++) {
            do {
                x = Math.round(Math.random() * this.width);
                y = Math.round(Math.random() * this.height);

                if (this.get(x,y) == false) {
                    this.setLive(x,y);
                    done = true;
                }
            } while (!done) ;
        }
    }

    public toArrayofStrings() : string[] {
        let result: string[] = [];
        for (let y = 0, line = "" ; y < this.height ; y++, line = "") {
            for (let x = 0 ; x < this.width ; x++ ) {
                line += this.data[y][x] ? '#' : ' ';
            }
            result.push(line);
        }
        return result;
    }

    public toString() : string {
        let arrayOfStrings = this.toArrayofStrings();

        let result = [];
        result.push('+' + '-'.repeat(this.width) + '+' );
        for (let y = 0;  y < this.height ; y++ ) {
            result.push('|' + arrayOfStrings[y] + '|')
        }
        result.push('+' + '-'.repeat(this.width) + '+' );
        return result.join('\n');
    }

    public inspect(depth, opts) : string {
        return this.toString();
    }
    
    public get(x: number, y:number) : boolean {
        if ( x >= 0 && y >= 0 && x < this.width && y < this.height) {
            return this.data[y][x];
        } else {
            return null;
        }
    }

    public setLive(x:number, y:number) : void {
        if ( x >= 0 && y >= 0 && x < this.width && y < this.height) {
            this.data[y][x] = true;
        }  
    }

    public setDead(x:number, y:number) : void {
        if ( x >= 0 && y >= 0 && x < this.width && y < this.height) {
            this.data[y][x] = false;
        }  
    }

    public getNeighbourCount(x: number, y:number) : number {
        if ( x >= 0 && y >= 0 && x < this.width && y < this.height) {
            let count = 0;
            for (let offset of OFFSETS) {
                const nx = x + offset.x;
                const ny = y + offset.y;

                if (nx >= 0 && ny >= 0 && nx < this.width && ny < this.height) {
                    count += this.data[ny][nx] ? 1 : 0;
                }
            }
            return count;
        } else {
            return null;
        }
    }

    public getNeighbourCounts() : number[][] {
        let result: number[][] = new Array();
        for (let y = 0 ; y < this.height ; y++) {
            let row: number[] = new Array();
            for (let x = 0 ; x < this.width ; x++ ) {
                row.push(this.getNeighbourCount(x,y));
            }
            result.push(row);
        }
        return result;
    }

    public static fromArrayOfStrings(givenState: string[]) : World {
        const height = givenState.length;
        const width = givenState[0].length;

        let new_world: World = new World(width, height);
        new_world.setFromArrayOfStrings(width, height, givenState);
        return new_world;
    }
}  

export class World {
    private state: State = null;
    public width: number = 0;
    public height: number = 0 ;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.state = new State(width, height);
    }

    public setFromArrayOfStrings(width: number, height: number, givenState: string[]) : void {
        this.state.setFromArrayOfStrings(width, height, givenState);
    }

    public setAllDead() : void {
        this.state.setAllDead();
    }

    public setAllLive() : void {
        this.state.setAllLive();
    }

    public setRandom(liveCount: number) : void {
        this.state.setRandom(liveCount);
    }

    public toArrayofStrings() : string[] {
        return this.state.toArrayofStrings();
    }

    public toString() : string {
        return this.state.toString();
    }

    public get(x: number, y:number) : boolean {
        return this.state.get(x, y);
    }

    public setLive(x:number, y:number) : void {
        this.state.setLive(x, y);
    }

    public setDead(x:number, y:number) : void {
        this.state.setDead(x, y);
    }

    public getNeighbourCount(x: number, y:number) : number {
        return this.state.getNeighbourCount(x, y);
    }

    public getNeighbourCounts() : number[][] {
        return this.state.getNeighbourCounts();
    }

    public static fromArrayOfStrings(givenState: string[]) : World {
        const height = givenState.length;
        const width = givenState[0].length;

        let new_world: World = new World(width, height);
        new_world.setFromArrayOfStrings(width, height, givenState);
        return new_world;
    }

    public tick(): void {
        const nextState = new State(this.width, this.height);
        for (let y = 0 ; y < this.height ; y++) {
            for (let x = 0 ; x < this.width ; x++ ) {
                const thisElement = this.get(x,y);
                const neighbors = this.getNeighbourCount(x,y);

                // 1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
                if ( thisElement == true && neighbors < 2) {
                    nextState.setDead(x,y);
                }

                // 2. Any live cell with two or three live neighbours lives on to the next generation.
                if ( thisElement == true && (neighbors == 2 || neighbors == 3) ) {
                    nextState.setLive(x,y);
                }

                // 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
                if ( thisElement == true && neighbors > 3 ) {
                    nextState.setDead(x,y);
                }

                // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                if ( thisElement == false && neighbors == 3 ) {
                    nextState.setLive(x,y);
                }
            }
        }
        this.state = nextState;  
    }
}   
