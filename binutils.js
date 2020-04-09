module.exports = class BinaryReader {

    constructor(p_InputBuffer, p_Endianness, p_Encoding) {

        if (p_InputBuffer instanceof Buffer) {
            this.ByteBuffer = Buffer.from(p_InputBuffer);
        } else if (p_InputBuffer instanceof Array || typeof p_InputBuffer == 'string') {
            this.ByteBuffer = new Buffer(p_InputBuffer, p_Encoding);
        } else {
            throw new Error('Invalid buffer input for BinaryReader (' + typeof p_InputBuffer + ')');
        }

        // Set the endianness
        this.Endianness = p_Endianness || 'big';

        // Set the length
        this.Length = this.ByteBuffer.length;

        // Set the position to 0
        this.Position = 0;
    }

    ReadUInt8 = function () {
        if (this.ByteBuffer.length < 1) {
            return 0;
        }

        const s_Val = this.ByteBuffer.readUInt8(this.Position);
        ++this.Position;
        return s_Val;
    }

    ReadUInt16 = function () {
        if (this.ByteBuffer.length < 2) {
            return 0;
        }

        const s_Val = (this.Endianness === 'little') ? this.ByteBuffer.readUInt16LE(this.Position) : this.ByteBuffer.readUInt16BE(this.Position);
        this.Position += 2;
        return s_Val;
    }

    ReadUInt32 = function () {
        if (this.ByteBuffer.length < 4) {
            return 0;
        }

        const s_Val = (this.Endianness === 'little') ? this.ByteBuffer.readUInt32LE(this.Position) : this.ByteBuffer.readUInt32BE(this.Position);
        this.ByteBuffer = this.ByteBuffer.slice(4);
        this.Position += 4;
        return s_Val;
    }

    ReadInt8 = function () {
        if (this.ByteBuffer.length < 1) {
            return 0;
        }

        const s_Val = this.ByteBuffer.readInt8(this.Position);
        ++this.Position;
        return s_Val;
    }

    ReadInt16 = function () {
        if (this.ByteBuffer.length < 2) {
            return 0;
        }

        const s_Val = (this.Endianness === 'little') ? this.ByteBuffer.readInt16LE(this.Position) : this.ByteBuffer.readInt16BE(this.Position);
        this.ByteBuffer = this.ByteBuffer.slice(2);
        this.Position += 2;
        return s_Val;
    }

    ReadInt32 = function () {
        if (this.ByteBuffer.length < 4) {
            return 0;
        }

        const s_Val = (this.Endianness === 'little') ? this.ByteBuffer.readInt32LE(this.Position) : this.ByteBuffer.readInt32BE(this.Position);
        this.ByteBuffer = this.ByteBuffer.slice(4);
        this.Position += 4;
        return s_Val;
    }

    ReadFloat = function () {
        if (this.ByteBuffer.length < 4) {
            return 0.0;
        }

        const s_Val = (this.Endianness === 'little') ? this.ByteBuffer.readFloatLE(this.Position) : this.ByteBuffer.readFloatBE(this.Position);
        this.ByteBuffer = this.ByteBuffer.slice(4);
        this.Position += 4;
        return s_Val;
    }

    ReadDouble = function () {
        if (this.ByteBuffer.length < 8) {
            return 0.0;
        }

        const s_Val = (this.Endianness === 'little') ? this.ByteBuffer.readDoubleLE(this.Position) : this.ByteBuffer.readDoubleBE(this.Position);
        this.ByteBuffer = this.ByteBuffer.slice(8);
        this.Position += 8;
        return s_Val;
    }

    ReadBytes = function (p_Count) {
        if (p_Count > this.ByteBuffer.length) {
            return Buffer.alloc(0);
        }

        const s_Val = Buffer.from(this.ByteBuffer, this.Position, p_Count);
        // this.ByteBuffer.copy(s_Val, 0, 0, p_Count);
        //
        // this.ByteBuffer = this.ByteBuffer.slice(p_Count);

        this.Position += p_Count;
        return s_Val;
    }
}