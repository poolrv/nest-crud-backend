import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity'; // Asegúrate de tener la entidad 'Item' creada
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  // Obtener todos los elementos
  async findAll(): Promise<Item[]> {
    return await this.itemsRepository.find();
  }

  // Obtener un elemento por ID
  async findOne(id: number): Promise<Item> {
    const item = await this.itemsRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item con ID ${id} no encontrado`);
    }
    return item;
  }

  // Crear un nuevo elemento
  async create(createItemDto: CreateItemDto): Promise<Item> {
    const newItem = this.itemsRepository.create(createItemDto);
    return await this.itemsRepository.save(newItem);
  }

  // Actualizar un elemento por ID
  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.findOne(id);
    const updatedItem = Object.assign(item, updateItemDto);
    return await this.itemsRepository.save(updatedItem);
  }

  // Eliminar un elemento por ID
  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.itemsRepository.remove(item);
  }
}
