// node in grid. 
function Node(x, y, walkable) {
    
    // The x coordinate of the node on the grid.
    this.x = x;
    // The y coordinate of the node on the grid.
    this.y = y;
    // Set walkable nodes
    this.walkable = (walkable === undefined ? true : walkable);
}

module.exports = Node;
